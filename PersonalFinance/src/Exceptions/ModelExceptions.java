package Exceptions;

import Settings.Text;

public class ModelExceptions extends Exception {
    public static final int EMPTY_TITLE = 1;
    public static final int ALREADY_EXISTS = 2;
    public static final int DATE_FORMAT = 3;
    public static final int EMPTY_CODE = 4;
    public static final int EMPTY_CURRENCY = 5;
    public static final int ACCOUNT_EMPTY = 6;
    public static final int AMOUNT_FORMAT = 7;
    public static final int NO_BASE_CURRENCY = 8;

    private final int code;

    public ModelExceptions (int code){
        this.code = code;
    }

    public String getMessage(){
        switch (code){
            case EMPTY_TITLE:
                return Text.getDate("ERROR: EMPTY TITLE!");
            case ALREADY_EXISTS:
                return Text.getDate("ERROR: THE ITEM EXISTS!");
            case DATE_FORMAT:
                return Text.getDate("ERROR: WRONG FORMAT!");
            case EMPTY_CODE:
                return Text.getDate("ERROR: EMPTY CODE!");
            case EMPTY_CURRENCY:
                return Text.getDate("ERROR: EMPTY CURRENCY!");
            case ACCOUNT_EMPTY:
                return Text.getDate("ERROR: EMPTY ACCOUNT!");
            case AMOUNT_FORMAT:
                return Text.getDate("ERROR: WRONG AMOUNT FORMAT!");
            case NO_BASE_CURRENCY:
                return Text.getDate("ERROR: NO BASE!");
        }
        return null;
    }
}
