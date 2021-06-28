package com.init.products;

public class Dungeon {

	private boolean A1;
	private boolean A2;
	private boolean C1;
	private boolean C2;
	
	public boolean isA1() {
		return A1;
	}
	public void setA1(boolean a) {
		A1 = a;
	}
	public boolean isA2() {
		return A2;
	}
	public void setA2(boolean b) {
		A2 = b;
	}
	public boolean isC1() {
		return C1;
	}
	public void setC1(boolean c) {
		C1 = c;
	}
	public boolean isC2() {
		return C2;
	}
	public void setC2(boolean d) {
		C2 = d;
	}

	
	public Dungeon(boolean a, boolean b, boolean c, boolean d) {
		
		A1 = a;
		A2 = b;
		C1 = c;
		C2 = d;
		
	}
	
}