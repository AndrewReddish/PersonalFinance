package Model;

import Exceptions.ModelExceptions;

import java.util.Objects;

public class Account extends Model{
    private String title;
    private Currency currency;
    private double startAmount;
    private double amount;

    public Account(){}

    public Account(String title, Currency currency, double startAmount, double amount) throws ModelExceptions {
        if (title.length() == 0) throw new ModelExceptions(ModelExceptions.EMPTY_TITLE);
        if (currency == null) throw new ModelExceptions(ModelExceptions.EMPTY_CURRENCY);
        this.title = title;
        this.currency = currency;
        this.startAmount = startAmount;
        this.amount = amount;
    }
    public double getAmount(){
        return amount;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public double getStartAmount() {
        return startAmount;
    }

    public void setStartAmount(double startAmount) {
        this.startAmount = startAmount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(title, account.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }
    public void setAmountFromTransactions (){

    }
}
