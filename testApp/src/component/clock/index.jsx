import Sun from '@/'
import { MechanicalClock } from './MechanicalClock'
import { DigitalClock } from './DigitalClock'

export function ClockView() {
	return (
		<>
			<MechanicalClock />
			<DigitalClock />
		</>
	)
}
