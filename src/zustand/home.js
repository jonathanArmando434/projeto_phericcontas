import { create } from "zustand";
import api from "../axios/api";

const search = create((set) => ({
  members: 0,

  clients: 0,

  tasksFinished: 0,

  clientsLogo: [],

  getPubliicInfo: async () => {
    try {
      const res = await api.get("/public/company/info");
      const data = res.data;
      const { members, clients, projetsFinished } = data;

      console.log(data)

      set(() => ({ members: members }));
      set(() => ({ clients: clients.total }));
      set(() => ({ tasksFinished: projetsFinished }));
      set(() => ({ clientsLogo: clients.clientsLogo }));
    } catch (error) {
      alert('Houve um erro, recarrega a página!');
    }
  },
}));

export default search;
