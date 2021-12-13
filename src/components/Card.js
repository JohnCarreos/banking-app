import { useHistory } from "react-router";

const Card = ({ id }) => {
  const user = JSON.parse(localStorage.getItem(id));
  const history = useHistory()
  function addZeroes(num) {
    return Number(num).toFixed(2)
  }
  console.log(id);
  return (
    <div class="card_">
      <div class="card__front card__part">
        <p class="card__info card__space-75">
        <i class="fas fa-dice"></i> INSTACASH
        </p>
        <p class="card__space-25 text-end">
        <i class="fas fa-sign-out-alt" onClick={()=>history.push({pathname:"/"})}></i>
        </p>
        <p class="card_number">
          <div class="card__label">Account Number</div>
          {user.id}
        </p>
        <div class="card__space-75">
          <span class="card__label">Card holder</span>
          <p class="card__info">{user.name}</p>
        </div>
        <div class="card__space-25">
          <span class="card__label">Balance</span>
          <p class="card__info">₱{addZeroes(user.balance)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
