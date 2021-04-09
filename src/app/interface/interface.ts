interface Picture {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
  displayed: boolean;
  uniqueId: number;
}

interface Player {
  username: string;
  totalPoints: number;
}

interface FormValidation {
  isMinlength: boolean;
  isSubmited: boolean;
}

export { Picture, Player, FormValidation };
