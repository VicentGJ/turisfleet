import CarService from "./CarService";
import DriverService from "./DriverService";
import GroupService from "./GroupService";
import SituationService from "./SituationService";

const carService = CarService.getInstance();
const driverService = DriverService.getInstance();
const groupService = GroupService.getInstance();
const situationService = SituationService.getInstance();

export { carService, driverService, groupService, situationService };
