class APIHandler {
  constructor(baseUrl) {
    console.log(baseUrl);
    this.api = axios.create({
      baseURL: baseUrl,
    });
  }

  getFullList() {
    return this.api.get("/characters");
  }

  getOneRegister(id) {
    return this.api.get(`/characters/${id}`);
  }

  createOneRegister(body) {
    return this.api.post(`/characters`, body);
  }

  updateOneRegister(id, body) {
    return this.api.put(`/characters/${id}`, body);
  }

  deleteOneRegister(id) {
    return this.api.delete(`/characters/${id}`);
  }
}
