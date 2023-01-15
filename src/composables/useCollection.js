import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  // add a new document
  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectFirestore.collection(collection).add(doc); //새로운 doc를 추가할 때 그 id를 리턴
      isPending.value = false;
      return res;
    } catch (err) {
      isPending.value = false;
      console.log(err.message);
      error.value = "could not send the message";
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;