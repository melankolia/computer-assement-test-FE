export const initialNewKecermatanQuestion = () => ({
  secureId: null,
  title: null,
  duration: 0,
  timer: 0,
  minutes: 0,
  seconds: 0,
  nowDate: null,
  nowHour: null,
  totalAnswer: null,
  sectionIndex: 0,
  sections: [
    {
      secureId: null,
      title: null,
      tableName: "Tabel Kolom Acuan",
      listAcuan: [
        {
          firstRow: ["A", "B", "C", "D", "E"],
          secondRow: ["0", "0", "0", "0", "0"],
        },
      ],
      question: [
        {
          secureId: null,
          title: ["0", "0", "0", "0"],
          answer: {
            secureId: null,
            symbol: null,
            value: null,
          },
          answerList: [
            {
              secureId: null,
              symbol: "A",
              value: 0,
            },
            {
              secureId: null,
              symbol: "B",
              value: 0,
            },
            {
              secureId: null,
              symbol: "C",
              value: 0,
            },
            {
              secureId: null,
              symbol: "D",
              value: 0,
            },
            {
              secureId: null,
              symbol: "E",
              value: 0,
            },
          ],
        },
      ],
    },
  ],
});
