type ErrorMessageProps =  {
  msg: string[];
}
const ErrorMessage = ({ msg = [] }: ErrorMessageProps) => {
  return msg && msg.length > 0 ? msg.map((m, i) => <p key={i} className="text-red-600 font-semibold">{m}</p>) : null;
}

export default ErrorMessage