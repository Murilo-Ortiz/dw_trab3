import http from "../http-common";

class PessoaDataService {

    getAll() {
        return http.get("/pessoas");
    }

    get(id) {
        return http.get(`/pessoas/${id}`);
    }

    create(data) {
        return http.post("/pessoas", data);
    }

    update(id, data) {
        return http.put(`/pessoas/${id}`, data);
    }

    delete(id) { 
        return http.delete(`/pessoas/${id}`);
    }

    deleteAll() {
        return http.delete("/pessoas");
    }

    findByNome(nome) {
        return http.get(`/pessoas?nome=${nome}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PessoaDataService();
