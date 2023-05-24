import { reactive } from "vue";
import countries from "../common/countriesList.json";

// This file acts like a store or provider to the whole application
// it's added in the App file as a provider and we inject in multiple
// places across the app to use the data inside of it.

// The state of the application

const state = reactive({
  users: [
    {
      id: 1,
      name: "User 1",
    },
    {
      id: 2,
      name: "User 2",
    },
    {
      id: 3,
      name: "User 3",
    },
    {
      id: 4,
      name: "User 4",
    },
  ],
  buildings: JSON.parse(localStorage.getItem("buildings")) || null,
  userBuildings: [],
  loading: false,
  error: false,
  showForm: false,
  selectedUser: null,
  selectedBuilding: null,
  buildingToBeUpdated: null,
  countryPosition: null,
  editMode: false,
});

// Methods that's used to change the states or as promises ro fetch and get data.

const methods = {
  getUserBuildings(userId, buildingId) {
    state.loading = true;
    this.fetchUserBuildings(userId).then((res) => {
      state.userBuildings = res;
      state.loading = false;
      if (res.length > 0) {
        if (buildingId)
          state.selectedBuilding = state.buildings.filter(
            (building) => building.id === buildingId
          )[0];
        else state.selectedBuilding = res[0];
        state.countryPosition = null;
        this.getMapData(state.selectedBuilding);
      }
    });
  },
  fetchUserBuildings(userId) {
    const promise = new Promise((reslove) => {
      setTimeout(() => {
        const usersBuildings = state.buildings.filter((building) => {
          return building.userId == userId;
        });

        reslove(usersBuildings);
      }, 1000);
    });

    return promise;
  },
  setShowForm(flag) {
    if (!flag) state.countryPosition = null;
    state.showForm = flag;
  },
  setSelectedUser(userId) {
    state.selectedUser = userId;
  },
  addBuilding(payload) {
    const buildingData = {
      id: new Date().getUTCMilliseconds(),
      name: payload.name,
      country: payload.country,
      userId: payload.userId,
    };
    state.buildings.push(buildingData);
    localStorage.setItem("buildings", JSON.stringify([...state.buildings]));
    this.getUserBuildings(payload.userId, buildingData.id);
    this.setShowForm(false);
  },
  updateBuilding(payload) {
    const buildingIdx = state.buildings.findIndex(
      (building) => building.id == state.buildingToBeUpdated.id
    );

    if (buildingIdx > -1) {
      state.buildings[buildingIdx] = {
        ...state.buildings[buildingIdx],
        name: payload.name,
        country: payload.country,
      };

      localStorage.setItem("buildings", JSON.stringify([...state.buildings]));
      this.getUserBuildings(
        state.selectedUser,
        state.buildings[buildingIdx].id
      );
      this.setShowForm(false);
      // this.getMapData(state.selectedBuilding);
    }
  },
  deleteBuilding(buildingId) {
    if (confirm("Are you sure you want to delete this building?")) {
      state.buildings = state.buildings.filter(
        (building) => building.id !== buildingId
      );

      localStorage.setItem("buildings", JSON.stringify([...state.buildings]));
      state.countryPosition = null;
      this.getUserBuildings(state.selectedUser);
    } else {
      return;
    }
  },
  setSelectedBuilding(building) {
    state.selectedBuilding = building;
    state.buildingToBeUpdated = null;
    this.getMapData(building);
  },
  setBuildingToBeUpdated(building) {
    state.buildingToBeUpdated = building;
  },
  getMapData(building) {
    state.loading = true;
    state.countryPosition = null;
    this.getBuildingCoordinates(building).then((res) => {
      state.countryPosition = res.length > 0 ? res[0].position : null;
      state.loading = false;
    });
  },
  getBuildingCoordinates(building) {
    const promise = new Promise((reslove) => {
      setTimeout(() => {
        const countryData = countries.filter((country) => {
          return country.id === building.country;
        });

        reslove(countryData);
      }, 1000);
    });

    return promise;
  },
  setEditMode(flag) {
    state.editMode = flag;
  },
};

export default {
  state,
  methods,
};
