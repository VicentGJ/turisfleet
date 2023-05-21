import CarService from './CarService'
import DriverService from './DriverService'
import GroupService from './GroupService'
import SituationService from './SituationService'
import ProgramService from './ProgramService'
import RequestService from './RequestService'
import ReportService from './ReportService'
const carService = CarService.getInstance()
const driverService = DriverService.getInstance()
const groupService = GroupService.getInstance()
const situationService = SituationService.getInstance()
const programService = ProgramService.getInstance()
const requestService = RequestService.getInstance()
const reportService = ReportService.getInstance()
export {
  carService,
  driverService,
  groupService,
  situationService,
  programService,
  requestService,
  reportService,
}
