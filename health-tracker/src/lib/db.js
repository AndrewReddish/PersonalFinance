import { supabase } from "./supabase";

// ─── Nutrition ────────────────────────────────────────────────────────────────

export async function getNutritionForDate(date) {
  const { data, error } = await supabase
    .from("food_entries")
    .select("*")
    .eq("date", date)
    .order("created_at");
  if (error) throw error;

  const result = { breakfast: [], lunch: [], dinner: [], snack: [] };
  (data || []).forEach((e) => {
    result[e.meal_type]?.push({
      id: e.id,
      foodId: e.food_id,
      name: e.food_name,
      weight: e.weight,
      kcal: e.kcal,
      protein: parseFloat(e.protein),
      fat: parseFloat(e.fat),
      carbs: parseFloat(e.carbs),
    });
  });
  return result;
}

export async function addFoodEntry(date, mealType, entry) {
  const { data, error } = await supabase
    .from("food_entries")
    .insert({
      date,
      meal_type: mealType,
      food_id: entry.foodId || null,
      food_name: entry.name,
      weight: entry.weight,
      kcal: entry.kcal,
      protein: entry.protein,
      fat: entry.fat,
      carbs: entry.carbs,
    })
    .select()
    .single();
  if (error) throw error;
  return { ...entry, id: data.id };
}

export async function removeFoodEntry(id) {
  const { error } = await supabase.from("food_entries").delete().eq("id", id);
  if (error) throw error;
}

export async function getNutritionForWeek(dates) {
  const { data, error } = await supabase
    .from("food_entries")
    .select("*")
    .in("date", dates);
  if (error) throw error;
  return data || [];
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export async function getActivityForDate(date) {
  const [{ data: day }, { data: workouts }] = await Promise.all([
    supabase.from("activity_days").select("*").eq("date", date).maybeSingle(),
    supabase.from("workouts").select("*").eq("date", date).order("created_at"),
  ]);
  return {
    steps: day?.steps || 0,
    weight: day?.weight || null,
    workouts: (workouts || []).map((w) => ({
      id: w.id,
      type: w.type,
      label: w.label,
      duration: w.duration,
      kcalBurned: w.kcal_burned,
    })),
  };
}

export async function upsertActivityDay(date, patch) {
  const { error } = await supabase
    .from("activity_days")
    .upsert({ date, ...patch, updated_at: new Date().toISOString() }, { onConflict: "date" });
  if (error) throw error;
}

export async function addWorkout(date, workout) {
  const { data, error } = await supabase
    .from("workouts")
    .insert({
      date,
      type: workout.type,
      label: workout.label,
      duration: workout.duration,
      kcal_burned: workout.kcalBurned,
    })
    .select()
    .single();
  if (error) throw error;
  return { ...workout, id: data.id };
}

export async function removeWorkout(id) {
  const { error } = await supabase.from("workouts").delete().eq("id", id);
  if (error) throw error;
}

export async function getActivityHistory(days = 14) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const dateStr = since.toISOString().slice(0, 10);

  const [{ data: actDays }, { data: works }] = await Promise.all([
    supabase.from("activity_days").select("*").gte("date", dateStr).order("date"),
    supabase.from("workouts").select("*").gte("date", dateStr).order("date"),
  ]);

  const map = {};
  (actDays || []).forEach((d) => { map[d.date] = { steps: d.steps, weight: d.weight, workouts: [] }; });
  (works || []).forEach((w) => {
    if (!map[w.date]) map[w.date] = { steps: 0, weight: null, workouts: [] };
    map[w.date].workouts.push({ id: w.id, type: w.type, label: w.label, duration: w.duration, kcalBurned: w.kcal_burned });
  });
  return map;
}

export async function getWeekCardioMinutes(weekDates) {
  const { data } = await supabase
    .from("workouts")
    .select("duration")
    .in("date", weekDates);
  return (data || []).reduce((sum, w) => sum + w.duration, 0);
}
