package com.nonakas.cestas.functions;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Data {

	public static String getDateTime() {
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		return dateFormat.format(date);
	}
}