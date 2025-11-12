import {type UserType } from "@/types/type-user"
import './userCard.css'

export const UserCard: React.FC<UserType> = ({fname, age, mainImg}) => {
  return (
    <div className="inline-block wrapper">
      <div className="card w-2xs flex content-center items-center flex-col border-2 border-solid border-black rounded-[27px] overflow-hidden
        ">
        <img src={mainImg} alt={fname} className="w-full object-cover"/>
        <div className="w-full flex items-center content-center justify-around">
          <h3>{fname}</h3>
          <h2>{age}</h2>
        </div>
      </div>
      <div className="buttons flex justify-between pt-4" >
        <button className="
              button-x
              w-[60px]
              h-[60px]
              rounded-full 
              border-4 
              border-solid 
              border-red-600 
              bg-white 
              text-red-600
              transform
              origin-center
              transition
              hover:scale-110
            "
          >X</button>
          <button className="
                  button-s
                  w-[60px] 
                  h-[60px]
                  rounded-full 
                  border-none
                  bg-[#6e6e6e] 
                  text-white
                  transform transition
                  hover:scale-110
            "
          >Skip</button>
          <button className="
              button-l
              w-[60px] 
              h-[60px]
              rounded-full 
              border-none
              bg-[#fc3da0] 
              text-white
              transform 
              transition
              hover:scale-110
            "
          >Like</button>
      </div>
    </div>
  )
}
