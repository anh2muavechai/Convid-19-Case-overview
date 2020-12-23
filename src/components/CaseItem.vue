<template>
	<div class="case-item">
		<div class="row">
			<div class="col-4 item">
				Total cases <br>
				<span id="case-confirmed" class="text-primary">
					<b>{{ this.convertNumber(status.Confirmed) }}</b>
				</span>
			</div>
			<div class="col-4 item">
				Recovered <br>
				<span id="case-recovered" class="text-success">
					<b>{{ this.convertNumber(status.Recovered) }}</b>
				</span>
			</div>
			<div class="col-4 item">
				Deaths <br>
				<span id="case-deaths" class="text-danger">
					<b>{{ this.convertNumber(status.Deaths) }}</b>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
    	props: {
            status: {
                type: Object,
                required: true
            },
        },
        methods: {
        	convertNumber (number) {
        		return new Intl.NumberFormat().format(number)
        	}
        }
	}
</script>