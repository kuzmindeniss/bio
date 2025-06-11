export enum AminoAcid {
  // Цистеин
  C = 'C',
  
  // Гидрофобные
  A = 'A',
  I = 'I',
  L = 'L',
  M = 'M',
  F = 'F',
  W = 'W',
  Y = 'Y',
  V = 'V',
  P = 'P',
  
  // Глицин
  G = 'G',
  
  // Отрицательно заряженные
  D = 'D',
  E = 'E',
  
  // Положительно заряженные
  K = 'K',
  R = 'R',
  
  // Полярные незаряженные
  S = 'S',
  T = 'T',
  H = 'H',
  Q = 'Q',
  N = 'N',
  
  // Разделитель
  GAP = '-',
}

export enum AminoAcidKind {
  Cysteine = 'Cysteine',
  Hydrophobic = 'Hydrophobic',
  Glycine = 'Glycine',
  NegativelyCharged = 'NegativelyCharged',
  PositivelyCharged = 'PositivelyCharged',
  PolarUncharged = 'PolarUncharged',
  Gap = 'Gap',
}

export const AMINO_ACID_TO_KIND_MAP: Record<AminoAcid, AminoAcidKind> = {
  [AminoAcid.C]: AminoAcidKind.Cysteine,
  
  // Гидрофобные - зеленый
  [AminoAcid.A]: AminoAcidKind.Hydrophobic,
  [AminoAcid.I]: AminoAcidKind.Hydrophobic,
  [AminoAcid.L]: AminoAcidKind.Hydrophobic,
  [AminoAcid.M]: AminoAcidKind.Hydrophobic,
  [AminoAcid.F]: AminoAcidKind.Hydrophobic,
  [AminoAcid.W]: AminoAcidKind.Hydrophobic,
  [AminoAcid.Y]: AminoAcidKind.Hydrophobic,
  [AminoAcid.V]: AminoAcidKind.Hydrophobic,
  [AminoAcid.P]: AminoAcidKind.Hydrophobic,
  
  // Глицин - серый
  [AminoAcid.G]: AminoAcidKind.Glycine,
  
  // Отрицательно заряженные - розовый
  [AminoAcid.D]: AminoAcidKind.NegativelyCharged,
  [AminoAcid.E]: AminoAcidKind.NegativelyCharged,
  
  // Положительно заряженные - фиолетовый
  [AminoAcid.K]: AminoAcidKind.PositivelyCharged,
  [AminoAcid.R]: AminoAcidKind.PositivelyCharged,
  
  // Полярные незаряженные - голубой
  [AminoAcid.S]: AminoAcidKind.PolarUncharged,
  [AminoAcid.T]: AminoAcidKind.PolarUncharged,
  [AminoAcid.H]: AminoAcidKind.PolarUncharged,
  [AminoAcid.Q]: AminoAcidKind.PolarUncharged,
  [AminoAcid.N]: AminoAcidKind.PolarUncharged,
  
  // Разделитель - белый или прозрачный
  [AminoAcid.GAP]: AminoAcidKind.Gap,
};

export const SEQUENCE_NAMES = ['1', '2'] as const;
