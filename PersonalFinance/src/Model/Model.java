package Model;

public abstract class Model {
    public String getValueForCombobox(){
        return null;
    }

    public void postAdd(){}
    public void postEdit(){ /*notify all objects after edit*/}
    public void postDelete(){}
}
