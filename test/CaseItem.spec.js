import { shallowMount } from '@vue/test-utils'
import CaseItem from './../src/components/CaseItem.vue'

describe('CaseItem.vue', () => {
	it('Show cases convid-19', () => {
		const status   = {
			"Country":"Viet Nam",
			"CountryCode":"",
			"Province":"",
			"City":"",
			"CityCode":"",
			"Lat":"0",
			"Lon":"0",
			"Confirmed":1414,
			"Deaths":35,
			"Recovered":1269,
			"Active":110,
			"Date":"2020-12-21T00:00:00Z"
		}
		
		const wrapper = shallowMount(CaseItem, {
		   	propsData: { status }
		})

		let caseConfirm   = wrapper.find('#case-confirmed'),
			caseRecovered = wrapper.find('#case-recovered'),
			caseDeaths    = wrapper.find('#case-deaths')
		
		expect(caseConfirm.text()).toContain(new Intl.NumberFormat().format(status.Confirmed))
		expect(caseRecovered.text()).toContain(new Intl.NumberFormat().format(status.Recovered))
		expect(caseDeaths.text()).toContain(new Intl.NumberFormat().format(status.Deaths))

	})
})