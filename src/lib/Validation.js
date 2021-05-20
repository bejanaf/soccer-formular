const validateName = (player) => player.length >= 2;
const validateEmail = (email) => email.includes('@');
const validatePrice = (price, free_transfer) =>
  (parseFloat(price) > 0 && !free_transfer) || free_transfer;

export default function validatePlayer(player) {
  return (
    validateName(player.name) &&
    validateEmail(player.email) &&
    validatePrice(player.price, player.free_transfer)
  );
}
