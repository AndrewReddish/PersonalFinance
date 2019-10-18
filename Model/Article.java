package Model;

import Exceptions.ModelExceptions;

import java.util.Objects;

public class Article extends Model {
    private String title;

    public Article(){}

    public Article (String title) throws ModelExceptions {
        if (title.length() == 0) throw new ModelExceptions(ModelExceptions.EMPTY_TITLE);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Article{" +
                "title='" + title + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return title.equals(article.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }
    @Override
    public String getValueForCombobox(){
        return title;
    }
}
