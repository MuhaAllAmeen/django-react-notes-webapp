import { useEffect, useState } from "react"
import api from "../api"
import '../styles/Home.css'
import Note from '../components/Note'

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get('/api/notes/').then((res) => res.data)
        .then((data) => setNotes(data))
        .catch((e) => alert(e))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note Deleted")
            else alert("Failed to delete")
            getNotes()

        }).catch((e) => alert(e))

    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { content, title }).then((res) => {
            if (res.status === 201) alert('Note created')
            else alert("Failed to create Note")
            getNotes()

        }).catch((e) => alert(e))

    }

    return <div>
        <div>
            <h2>Notes</h2>
            {
            notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title: </label>
            <br />
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
            <br />
            <label htmlFor="content"> Content: </label>
            <br />
            <textarea name="content" id="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
}

export default Home