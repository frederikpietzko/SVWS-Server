package de.svws_nrw.module.pdf;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.util.XRLog;

/**
 * Diese Klasse dient der Erzeugung von PDF-Dokumenten.
 */
public class PDFCreator {

	/** Das PDF-Dokument mit Platzhaltern */
	private final String body;

	/** CSS-Style-Sheets zum Ergänzen der Default-CSS-Einträge unten */
	private final String css;

	/** Die Daten zum Ersetzen von Platzhaltern im Body */
	protected HashMap<String, String> bodyData = new HashMap<>();

	/** Default CSS-Definition für die Gestaltung der Seiten */
	protected String pageCSS =
		"""
		@Page {
			size : A4;
			margin: 1cm;
			@bottom-left {
				content: element(footer);
			}
		}
		.footer {
			position: running(footer);
		}
		""";

	/** Default CSS-Definition für die Gestaltung des Body */
	protected String bodyCSS = "body { font-family: Helvetica, sans-serif; font-weight: normal; font-size: 11px; }";

	/** Default CSS-Definition für die Gestaltung von Überschriften h1 */
	protected String h1CSS = "h1 { font-size: 2em; font-weight: bold; }";

	/** Default CSS-Definition für die Gestaltung von Überschriften h1 */
	protected String h2CSS = "h2 { font-size: 1.4em; font-weight: bold; }";

	/** Default CSS-Definition für die Gestaltung von Überschriften h1 */
	protected String h3CSS = "h3 { font-size: 1.2em; font-weight: bold; }";

	/** Default CSS-Definition für die Gestaltung von Überschriften h1 */
	protected String h4CSS = "h4 { font-size: 1em; font-weight: bold; }";

	/** Default CSS-Class für eine type font */
	protected String css_class_tinyfont = ".tinyfont { font-size: 0.6em; }";

	/** Der Titel des PDF-Dokuments */
	private final String title;

	/** Ein nachfolgender PDF-Creator, der für Folgeseiten genutzt wird (nur body). Dieser kann wiederum einen Nachfolge haben. */
	private PDFCreator next = null;


	/**
	 * Erstellt einen neuen Manager für PDF-Dokumente.
	 * Das Default-Layout wird auf DIN A4 und Hochformat gesetzt.
	 *
	 * @param title   der Titel des Dokuements
	 * @param body    der Body des HTML-Dokuments - ohne Ersetzungen
	 * @param css     weitere CSS-Style-Sheets zum Ergänzen der Default-CSS-Style-Sheets
	 */
	public PDFCreator(final String title, final String body, final String css) {
		this.title = title;
		this.body = body;
		this.css = css;
	}


	/**
	 * Setzt den PDF-Creator, der für Folgeseiten genutzt wird (nur body).
	 *
	 * @param next   der nachfolgende PDF-Creator
	 */
	public void setNext(final PDFCreator next) {
		this.next = next;
	}



	/**
	 * Erstellt im Body-Template die Platzhalter und gibt den HTML-Body-String zurück.
	 *
	 * @return der HTML-Body-String
	 *
	 * @throws IOException wenn der HTML-Body nicht erzeugt werden kann
	 */
	private String getBody() throws IOException {
		final StringBuilder result = new StringBuilder();
		final String[] parts = body.split("@@");
		for (int i = 0; i < parts.length; i++) {
			if (i % 2 == 0) {
				result.append(parts[i]);
			} else {
				final String mapped = bodyData.get(parts[i]);
				if (mapped != null)
					result.append(mapped);
				else
					throw new IOException("Fehlerhaftes HTML-Template in Klasse " + this.getClass().getCanonicalName());
			}
		}
		if (next != null) {
			result.append("<div style=\"page-break-after: always;\"></div>");
			result.append(next.getBody());
		}
		return result.toString();
	}

	/**
	 * Erstellt den HTML-String für das Erzeugen des PDF-Dokuments
	 *
	 * @return der HTML-String
	 *
	 * @throws IOException wenn das HTML-Dokument nicht erzeugt werden kann
	 */
	private String getHtml() throws IOException {
		final StringBuilder html = new StringBuilder();
		html.append("<html lang=\"de\">");
		html.append("<head>");
		html.append("<title>").append(title).append("</title>");
		html.append("<style>");
		html.append(pageCSS)
			.append(bodyCSS)
			.append(h1CSS)
			.append(h2CSS)
			.append(h3CSS)
			.append(h4CSS)
			.append(css_class_tinyfont)
			.append(css);
		html.append("</style>");
		html.append("</head>");
		html.append("<body>");
		html.append(getBody());
		html.append("</body>");
		html.append("</html>");
		return html.toString();
	}



	/**
	 * Erzeugt das PDF-Dokument und schreibt in den übergebenen Output-Stream.
	 *
	 * @param os   the {@link OutputStream} to be used
	 *
	 * @throws IOException   wenn der HTML-Code nicht erzeugt werden kann oder bei einem Fehler beim Rendern (siehe auch {@link PdfRendererBuilder#run()}
	 */
	private void runBuilder(final OutputStream os) throws IOException {
		final String html = getHtml();
		XRLog.listRegisteredLoggers().forEach(logger -> XRLog.setLevel(logger, java.util.logging.Level.WARNING));
		final Calendar now = Calendar.getInstance();
		try (PDDocument doc = new PDDocument()) {
			final PDDocumentInformation info = doc.getDocumentInformation();
			info.setAuthor("SVWSServer");
			info.setCreationDate(now);
			info.setCreator("SVWSServer");
			info.setModificationDate(now);
			info.setProducer("SVWSServer");
			final PdfRendererBuilder builder = new PdfRendererBuilder();
			builder.useFastMode();
			builder.usePDDocument(doc);
			builder.withHtmlContent(html, null);
			builder.toStream(os);
			builder.run();
		}
	}


	/**
	 * Erzeugt eine unordered list (ul) aus der übergebenen String-Liste
	 * und schreibt das Ergebnis in den übergebenen {@link StringBuilder}.
	 * Ist die Liste null oder leer, so wird keine unordered list erzeugt.
	 *
	 * @param sb     der StringBuilder
	 * @param list   die Liste
	 */
	public static void ul(final StringBuilder sb, final List<String> list) {
		if ((list == null) || (list.isEmpty()))
			return;
		sb.append("<ul>");
		for (final String s : list) {
			sb.append("<li>");
			sb.append(s);
			sb.append("</li>");
		}
		sb.append("</ul>");
	}


	/**
	 * Speichert das PDF-Dokument in einem byte[].
	 *
	 * @return das Byte-Array mit dem PDF-Dokument oder null im Fehlerfall
	 */
	public byte[] toByteArray() {
		try {
			final ByteArrayOutputStream baos = new ByteArrayOutputStream(32768);
			runBuilder(baos);
			return baos.toByteArray();
		} catch (@SuppressWarnings("unused") final IOException e) {
			return new byte[0];
		}
	}


	/**
	 * Speichert das PDF-Dokument in der Datei mit dem
	 * übergebenen Dateinamen.
	 *
	 * @param filename   der Dateiname
	 *
	 * @throws IOException im Fehlerfall (siehe auch {@link PdfRendererBuilder#run()}
	 */
	public void save(final String filename) throws IOException {
		final File file = new File(filename);
		// TODO Create directory if it does not exist
		try (FileOutputStream fos = new FileOutputStream(file)) {
			runBuilder(fos);
		}
	}

}
