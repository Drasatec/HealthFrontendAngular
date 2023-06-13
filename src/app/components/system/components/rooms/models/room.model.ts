export class RoomModel {
  id: number;
  photo: string;
  codeNumber: string;
  isDeleted: boolean;
  hospitalsContactData: [
      {
          id: number;
          telephoneNumber: string;
          email: string;
          whatsAppNumber: string;
          hospitalId: 1
      }
  ];
  hospitalTrasnlations: [
      {
          id: number;
          name: string;
          address: string;
          hospitalId: number;
          langCode: string;
      },
    ]
}
