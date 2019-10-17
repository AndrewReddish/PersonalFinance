package Model;

import Exceptions.ModelExceptions;

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
        if(fromAmount == 0) throw new ModelExceptions (ModelExceptions.AMOUNT_FORMAT);//not sure if needed
        if(toAmount == 0) throw new ModelExceptions (ModelExceptions.AMOUNT_FORMAT);
        this.accountFrom = accountFrom;
        this.accountTo = accountTo;
        this.fromAmount = fromAmount;
        this.toAmount = toAmount;
        this.note = note;
    }
}
