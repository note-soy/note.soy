import axios from 'axios';

const API_ROOT = 'https://onions.note.soy';

interface Note {
    id: string;
    content: string;
}

export const getNote = (id: string) => {

    return axios.get<Note>(`${API_ROOT}/note/${id}`);

}