import { GostBlockungKurs, GostBlockungSchiene, GostBlockungRegel, GostKursart, SchuelerListeEintrag, GostFach } from '@svws-nrw/svws-core-ts';
import { computed, Ref, WritableComputedRef } from 'vue';

export function getKursFromId(kurse: GostBlockungKurs[], kursId: number): GostBlockungKurs {
	return kurse.find(kurs => kurs.id === kursId) || new GostBlockungKurs();
}
export function getKursbezeichnung(kurs: GostBlockungKurs, mapFaecher: Map<number, GostFach>) {
	const kuerzel = mapFaecher.get(kurs.fach_id)?.kuerzel;
	const kursart = kurs.kursart > 0 ? GostKursart.fromID(kurs.kursart) : 'kursart-fehlt';
	const suffix = kurs.suffix ? "-" + kurs.suffix : "";
	return `${kuerzel}-${kursart}${kurs.nummer}${suffix}`
}
/*
export function createKursbezeichnungsGetter(kurs: GostBlockungKurs, mapFaecher: Map<number, GostFach>, parameter: number = 0) {
	return  (regel: GostBlockungRegel): String => {
		const manager = blockung.datenmanager
		if (manager === undefined)
			throw new Error("Der Kursblockungsmanager ist nicht verfügbar")
		const kurs = manager.getKurs(regel.parameter.get(parameter).valueOf())
		return manager.getNameOfKurs(kurs.id)
	}
}
*/
export function useRegelParameterKursart(regel: Ref<GostBlockungRegel | undefined>, parameter: number): WritableComputedRef<GostKursart> {
	return computed({
		get: () => regel.value === undefined ? GostKursart.LK : GostKursart.fromID(regel.value.parameter.get(parameter).valueOf()),
		set: (value) => { if (regel.value) regel.value.parameter.set(parameter, value.id) }
	})
}

export function useRegelParameterKurs(kurse: GostBlockungKurs[], regel: Ref<GostBlockungRegel | undefined>, parameter: number): WritableComputedRef<GostBlockungKurs> {
	return computed({
		get: () => kurse.find(kurs => kurs.id === regel.value?.parameter.get(parameter)) || new GostBlockungKurs(),
		set: (value) => { if (regel.value) regel.value.parameter.set(parameter, value.id)	}
	})
}

export function useRegelParameterSchiene(schienen: GostBlockungSchiene[], regel: Ref<GostBlockungRegel | undefined>, parameter: number): WritableComputedRef<GostBlockungSchiene> {
	return computed({
		get: () => schienen.find(schiene => schiene.nummer === regel.value?.parameter.get(parameter)) || new GostBlockungSchiene(),
		set: (value) => { if (regel.value) regel.value.parameter.set(parameter, value.nummer) }
	})
}

export function useRegelParameterSchueler (schueler: SchuelerListeEintrag[], regel: Ref<GostBlockungRegel | undefined>, parameter: number): WritableComputedRef<SchuelerListeEintrag> {
	return computed({
		get: () => schueler.find(s => s.id === regel.value?.parameter.get(parameter)) || new SchuelerListeEintrag(),
		set: (value) => { if (regel.value) regel.value.parameter.set(parameter, value.id)	}
	})
}