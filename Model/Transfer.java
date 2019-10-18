package Model;

import Exceptions.ModelExceptions;

import java.util.Date;

public class Transfer {
    public Account accountFrom;
    public Account accountTo;
    public double fromAmount;
    public double toAmount;
    public String note;

    public Transfer(){}

    public Transfer(Account accountFrom, Account accountTo, double fromAmount, double toAmount, String note)
            throws ModelExceptions {
        if(accountFrom == null) throw new ModelExceptions (ModelExceptions.ACCOUNT_EMPTY);
        if(accountTo == null) throw new ModelExceptions (ModelExceptions.ACCOUNT_EMPTY);
        this.accountFrom = accountFrom;
        this.accountTo = accountTo;
        this.fromAmount = fromAmount;
        this.toAmount = toAmount;
        this.note = note;
    }

    public Transfer(Account accountFrom, Account accountTo, double fromAmount, double toAmount, Date date) throws ModelExceptions {
        this.accountFrom = accountFrom;
        this.accountTo = accountTo;
        this.fromAmount = fromAmount;
        this.toAmount = toAmount;
    }

    public Account getAccountFrom() {
        return accountFrom;
    }

    public void setAccountFrom(Account accountFrom) {
        this.accountFrom = accountFrom;
    }

    public Account getAccountTo() {
        return accountTo;
    }

    public void setAccountTo(Account accountTo) {
        this.accountTo = accountTo;
    }

    public double getFromAmount() {
        return fromAmount;
    }

    public void setFromAmount(double fromAmount) {
        this.fromAmount = fromAmount;
    }

    public double getToAmount() {
        return toAmount;
    }

    public void setToAmount(double toAmount) {
        this.toAmount = toAmount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}
