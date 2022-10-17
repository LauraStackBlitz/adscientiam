import { SEPType } from "./app/septype"

export interface Patient {
    pairing: boolean,
    createdAt: Date,
    firstName: string,
    lastName: string,
    dominantHand: string,
    gender: string,
    medicalInfo: {
      SEPType: SEPType,
      scoreEDSS: number,
      walkingStickAid: boolean,
      crutchesAid: boolean,
      wheelChairAid: boolean,
      walkerAid: boolean,
      walkWithCaregiverAid: boolean,
      factors: {
        firstDegree: boolean,
        secondDegree: boolean,
        noDegree: boolean,
        notSure: boolean
      }
    },
    id:number
  }