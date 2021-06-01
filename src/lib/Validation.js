const validateName = (player) => player.length >= 2;
const validateEmail = (mail) => mail.includes('@');
const validatePrice = (price, free_transfer) =>
  (parseFloat(price) > 0 && !free_transfer) || free_transfer;

export default function validatePlayer(player) {
  return (
    validateName(player.name) &&
    validateEmail(player.mail) &&
    validatePrice(player.price, player.free_transfer)
  );
}
