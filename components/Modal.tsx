import { Modal, StyleSheet, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { app, firestore } from "../firebase";

type Item = {
  key: string;
  name: string;
  amount: number;
  loanDate: string;
};

type ModalComponentProps = {
  visible: boolean;
  hideModal: () => void;
  item: Item;
  onSave: (item: Item) => void;
  onDelete: (item: Item) => void;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  hideModal,
  item,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState(item.name);
  const [money, setMoney] = useState(item.amount.toString());
  const [date, setDate] = useState(item.loanDate);

  useEffect(() => {
    // Update the local state with the new item
    setName(item.name);
    setMoney(item.amount.toString());
    setDate(item.loanDate);
  }, [item]);

  const handleSave = async () => {
    const newItem = {
      ...item,
      name,
      amount: Number(money),
      loanDate: date,
    };

    await updateDoc(doc(firestore, "loans", newItem.key), newItem);

    onSave(newItem);
    hideModal();
  };
  //handle delete
  const handleDelete = async (key: string) => {
    await deleteDoc(doc(firestore, "loans", key));
    onDelete(item);
    hideModal();
    console.log("delete");
  };
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable style={styles.centeredView} onPress={hideModal}>
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          <Text>Edit the item.</Text>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Money"
            value={money}
            onChangeText={setMoney}
            style={styles.input}
          />
          <TextInput
            label="Date"
            value={date}
            onChangeText={setDate}
            style={styles.input}
          />
          <Button onPress={handleSave}>Save</Button>
          <Button onPress={() => handleDelete(item.key)}>Delete</Button>
        </View>
      </Pressable>
    </Modal>
  );
};

// Styles and exports omitted for brevity...
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // optional, for a semi-transparent background
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
});

export default ModalComponent;
