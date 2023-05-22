import CarService from './CarService'
import DriverService from './DriverService'
import GroupService from './GroupService'
import SituationService from './SituationService'
import ProgramService from './ProgramService'
import RequestService from './RequestService'
import ReportService from './ReportService'
import AuthService from './AuthService'
const carService = CarService.getInstance()
const driverService = DriverService.getInstance()
const groupService = GroupService.getInstance()
const situationService = SituationService.getInstance()
const programService = ProgramService.getInstance()
const requestService = RequestService.getInstance()
const reportService = ReportService.getInstance()
const authService = AuthService.getInstance()
export {
  carService,
  driverService,
  groupService,
  situationService,
  programService,
  requestService,
  reportService,
  authService,
}
