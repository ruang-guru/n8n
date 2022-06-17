import * as promClient from 'prom-client';

export class Metrics {

	constructor(private register: promClient.Registry) {
		const prefix = "n8n_metrics_"
		register.setDefaultLabels({ prefix });
		promClient.collectDefaultMetrics({ register });
	}

	initCounter(name: string, help: string, labels: string[]): promClient.Counter<string> {
		return new promClient.Counter({
			name,
			help,
			labelNames: labels,
			registers: [this.register],
		});
	}

	initGauge(name: string, help: string, labels: string[]): promClient.Gauge<string> {
		return new promClient.Gauge({
			name,
			help,
			labelNames: labels,
			registers: [this.register],
		});
	}

	initHistogram(
		name: string,
		help: string,
		labels: string[],
		buckets: number[],
	): promClient.Histogram<string> {
		return new promClient.Histogram({
			name,
			help,
			labelNames: labels,
			buckets,
			registers: [this.register],
		});
	}

	getMetricsRegistry(): promClient.Registry {
		return this.register;
	}
}
