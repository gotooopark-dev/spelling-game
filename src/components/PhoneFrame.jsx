export default function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-notch" />
      <div className="phone-screen">{children}</div>
    </div>
  );
}
