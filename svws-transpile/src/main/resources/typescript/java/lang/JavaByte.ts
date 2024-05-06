import { JavaObject } from './JavaObject';
import { NullPointerException } from './NullPointerException';
import { NumberFormatException } from './NumberFormatException';

export class JavaByte extends JavaObject {

	public static MAX_VALUE : number = +0x7f;
	public static MIN_VALUE : number = -0x80;
	public static SIZE : number = 8;
	public static BYTES : number = 1;

	public static parseByte(s : string | null) : number {
		if (s === null)
			throw new NullPointerException();
		const a : number = parseInt(s, 10);
		if (Number.isNaN(a) || (a < this.MIN_VALUE) || (a > this.MAX_VALUE))
			throw new NumberFormatException();
		return a;
	}

	public static compare(a : number, b : number): number {
		return a === b ? 0 : (a < b) ? -1 : 1;
	}

	public static hashCode(value : number) : number {
		return value;
	}

	transpilerCanonicalName(): string {
		return 'java.lang.Byte';
	}

	isTranspiledInstanceOf(name : string): boolean {
		return [
			'java.lang.Byte',
			'java.lang.Number',
			'java.lang.Object',
			'java.lang.Comparable',
			'java.lang.Serializable'
		].includes(name);
	}

}


export function cast_java_lang_Byte(obj : unknown) : number | null {
	return obj as number | null;
}
