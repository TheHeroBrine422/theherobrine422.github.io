// instructions: put a string of DNA bases into line 3 all caps with spaces seperating the codons then run the program

var DNA = "TAC AGA CGG CAA CTC TGG GTG CTT TGT TCT CTT CTC AGT ATC" // input
var RNA = "" // outputs
var AminoAcids = "" // outputs
var start = false

console.log("DNA: " + DNA)

for (var i = 0; i < DNA.length; i++) { // convert DNA to RNA   transcription   key: T=A A=U G=C C=G
  switch(DNA[i]) {
    case "T":
      RNA = RNA + "A"
      break
    case "A":
      RNA = RNA + "U"
      break
    case "G":
      RNA = RNA + "C"
      break
    case "C":
      RNA = RNA + "G"
      break
    default:
      RNA = RNA + " "
      break
  }
}

console.log("RNA: " + RNA)

for (var i = 0; i < RNA.length; i=i+4) { // convert RNA to Amino Acids   translation   key: https://www.hmhco.com/content/science/sciencedimensions/na/gr9-12/ese_biology_9780544811966_/book_pages/OPS/img/cards/bi_cnlese811966_464a.jpg
  if (RNA[i] == "U") {

    if (RNA[i+1] == "U") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // UU U/C
        if (start) {AminoAcids = AminoAcids + "PHE "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A" || RNA[i+2] == "G") {// UU A/G
        if (start) {AminoAcids = AminoAcids + "LEU "} else {AminoAcids = AminoAcids + "    "}
      }
    } else if (RNA[i+1] == "C") { // UC*
      if (start) {AminoAcids = AminoAcids + "SER "} else {AminoAcids = AminoAcids + "    "}
    } else if (RNA[i+1] == "A") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // UA U/C
        if (start) {AminoAcids = AminoAcids + "TYR "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A" || RNA[i+2] == "G") { // UA A/G   SPEICAL end condition
        if (start) {AminoAcids = AminoAcids + "stp "} else {AminoAcids = AminoAcids + "    "}
        start = false
      }
    } else if (RNA[i+1] == "G") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // UG U/C
        if (start) {AminoAcids = AminoAcids + "CYS "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A") { // UGA
        if (start) {AminoAcids = AminoAcids + "stp "} else {AminoAcids = AminoAcids + "    "}
        start = false
      } else if (RNA[i+2] == "G") { // UGG
        if (start) {AminoAcids = AminoAcids + "TRP "} else {AminoAcids = AminoAcids + "    "}
      }
    }

  } else if (RNA[i] == "C") {

    if (RNA[i+1] == "U") { // CU*
      if (start) {AminoAcids = AminoAcids + "LEU "} else {AminoAcids = AminoAcids + "    "}
    } else if (RNA[i+1] == "C") { // CC*
      if (start) {AminoAcids = AminoAcids + "PRO "} else {AminoAcids = AminoAcids + "    "}
    } else if (RNA[i+1] == "A") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // CA U/C
        if (start) {AminoAcids = AminoAcids + "HIS "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A" || RNA[i+2] == "G") {// CA A/G
        if (start) {AminoAcids = AminoAcids + "GLN "} else {AminoAcids = AminoAcids + "    "}
      }
    } else if (RNA[i+1] == "G") { // CG*
      if (start) {AminoAcids = AminoAcids + "ARG "} else {AminoAcids = AminoAcids + "    "}
    }

  } else if (RNA[i] == "A") {

    if (RNA[i+1] == "U") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C" || RNA[i+2] == "A") { // AU U/C/A
        if (start) {AminoAcids = AminoAcids + "ARG "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "G") { // AUG   SPECIAL this is the start condition
        start = true
        AminoAcids = AminoAcids + "met "
      }
    } else if (RNA[i+1] == "C") { // AC*
      if (start) {AminoAcids = AminoAcids + "THR "} else {AminoAcids = AminoAcids + "    "}
    } else if (RNA[i+1] == "A") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // AA U/C
        if (start) {AminoAcids = AminoAcids + "ASN "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A" || RNA[i+2] == "G") {// AA A/G
        if (start) {AminoAcids = AminoAcids + "LYS "} else {AminoAcids = AminoAcids + "    "}
      }
    } else if (RNA[i+1] == "G") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // AG U/C
        if (start) {AminoAcids = AminoAcids + "SER "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A" || RNA[i+2] == "G") {// AG A/G
        if (start) {AminoAcids = AminoAcids + "ARG "} else {AminoAcids = AminoAcids + "    "}
      }
    }

  } else if (RNA[i] == "G") {

    if (RNA[i+1] == "U") { // GU*
      if (start) {AminoAcids = AminoAcids + "VAL "} else {AminoAcids = AminoAcids + "    "}
    } else if (RNA[i+1] == "C") { // GC*
      if (start) {AminoAcids = AminoAcids + "ALA "} else {AminoAcids = AminoAcids + "    "}
    } else if (RNA[i+1] == "A") {
      if (RNA[i+2] == "U" || RNA[i+2] == "C") { // GA U/C
        if (start) {AminoAcids = AminoAcids + "ASP "} else {AminoAcids = AminoAcids + "    "}
      } else if (RNA[i+2] == "A" || RNA[i+2] == "G") {// GA A/G
        if (start) {AminoAcids = AminoAcids + "GLU "} else {AminoAcids = AminoAcids + "    "}
      }
    } else if (RNA[i+1] == "G") { // GG*
      if (start) {AminoAcids = AminoAcids + "GLY "} else {AminoAcids = AminoAcids + "    "}
    }

  }
}

console.log("AMA: " + AminoAcids)
