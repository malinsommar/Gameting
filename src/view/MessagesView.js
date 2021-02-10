import React, {useState, useEffect} from 'react'
import {useAuth} from '../shared/global/provider/UserProvider'
import firebase from 'firebase/app'
import './messageView.css'
import 'firebase/firestore'

export const MessagesView = () => {

    const [data, setData] = useState()
    const [currentChat, setCurrentChat] = useState(0)
    const firestore = firebase.firestore()
    const {currentUser} = useAuth()
    const matchesRef = firestore.collection('users').doc(currentUser.uid)

    useEffect(() => {
        matchesRef.get().then(function(doc) {
            console.log(doc.data())
        })
    }, [])

    const partners = [
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Lisa"
        },
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Johanna"
        },
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Andrea"
        },
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Sarah"
        },
    ]

    const matchMessageChoice = () => {
        return(
            <div style={{display: "flex"}}>
                <div>
                    {partners.map((item, index) => {
                        return(
                            <li onClick={() => setCurrentChat(index)} key={index} className="matchMessageChoices"><img src={item.img} alt="Partner message choice" /><p>{item.name}</p></li>
                        )
                    })}
                </div>
                <div className="verticalLine"></div>
            </div>
        )
    }

    const chosenMatchMessage = () => {
        return(
            <div>
                <h1>{partners[currentChat].name}</h1>
            </div>
        )
    }

    return(
        <div style={{display: "flex"}}>
            {matchMessageChoice()}
            {chosenMatchMessage()}
        </div>
    )
}


/*
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}
*/