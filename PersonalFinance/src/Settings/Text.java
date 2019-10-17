
package Settings;

import java.util.HashMap;

public final class Text {
    private static final HashMap<String, String> data = new HashMap();

    public static String getDate(String key){
        return data.get(key);
    }
    public static String[] getMonths(){
        String [] months = new String [12];
        months [0] = getDate("January");
        months [1] = getDate("February");
        months [2] = getDate("March");
        months [3] = getDate("April");
        months [4] = getDate("May");
        months [5] = getDate("June");
        months [6] = getDate("July");
        months [7] = getDate("August");
        months [8] = getDate("September");
        months [9] = getDate("October");
        months [10] = getDate("November");
        months [11] = getDate("December");
        return months;
    }

    public static void init (){
        data.put("PROGRAM_NAME", "Personal accounting");
        data.put("FILE_MENU", "File");
        data.put("EDIT_MENU", "Edit");
        data.put("VIEW_MENU", "View");
        data.put("HELP_MENU", "Help");

        data.put("January","01");
        data.put("February","02");
        data.put("March","03");
        data.put("April","04");
        data.put("May","05");
        data.put("June","Июнь");
        data.put("July","07");
        data.put("August","08");
        data.put("September","09");
        data.put("October","10");
        data.put("November","11");
        data.put("December","12");

        data.put("ERROR: EMPTY TITLE!","ERROR: EMPTY TITLE!");
        data.put("ERROR: THE ITEM EXISTS!","ERROR: THE ITEM EXISTS!");
        data.put("ERROR: WRONG FORMAT!","ERROR: WRONG FORMAT!");
        data.put("ERROR: EMPTY CODE!","ERROR: EMPTY CODE!");
        data.put("ERROR: EMPTY CURRENCY!","ERROR: EMPTY CURRENCY!");
        data.put("ERROR: EMPTY ACCOUNT!","ERROR: EMPTY ACCOUNT!");
        data.put("ERROR: WRONG AMOUNT FORMAT!","ERROR: WRONG AMOUNT FORMAT!");
        data.put("ERROR: NO BASE!","ERROR: NO BASE!");
    }
}
