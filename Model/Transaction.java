package Model;

import Exceptions.ModelExceptions;

import java.util.Date;

public class Transaction extends Model{
    private Account account;
    private Article article;
    private double amount;
    private String note;
    private Date date;

    public Transaction(Account account, Article article, double amount, String note, Date date)
            throws ModelExceptions {
        if (account == null) throw new ModelExceptions(ModelExceptions.ACCOUNT_EMPTY);
        if (article == null) throw new ModelExceptions(ModelExceptions.EMPTY_TITLE);

        this.account = account;
        this.article = article;
        this.amount = amount;
        this.note = note;
        this.date = date;
    }

    public Transaction(Account account, Article article, double amount, String note) throws ModelExceptions{
        this(account,article,amount,note,new Date());
    }
    public Transaction(Account account, Article article, double amount, Date date) throws ModelExceptions{
        this(account,article,amount,"", date);
    }
    public Transaction(){}

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
