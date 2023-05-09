import CarService from "./CarService";
import DriverService from "./DriverService";
import GroupService from "./GroupService";

const carService = CarService.getInstance();
const driverService = DriverService.getInstance();
const groupService = GroupService.getInstance();

export { carService, driverService, groupService };
