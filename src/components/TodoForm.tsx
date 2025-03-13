import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Todo{
    todo : string;
    completed: boolean;
    userId : number;
}

interface TodoFormFields{
    todo : string
    userId: number;
}

interface TodoFormElementProps{
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, Todo, unknown>;
    defaultInputData?: Todo;
}



const TodoForm : React.FC<TodoFormElementProps> = (props) => {
    const {register, handleSubmit, setValue ,formState : {errors}} = useForm<TodoFormFields>()

    useEffect(() => {
      if (props.defaultInputData) {
        setValue("todo", props.defaultInputData.todo);
        setValue("userId", props.defaultInputData.userId);
      }
    }, [props.defaultInputData]);

    const submitHandler = (data : TodoFormFields) => {
        if (props.isEdit) {
            if (!confirm("Are you sure want to update post data ? ")) return;
            
          }

      const newTodoDat : Todo = {
          todo : data.todo,
          userId : data.userId,
          completed : false
      }


      props.mutateFn(newTodoDat);
    }

  return (
    <form className="flex flex-col space-y-10 mb-50 mt-10 p-3 max-w-[500px] mx-auto" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col">
            <label className="text-lg font-bold text-gray-700" htmlFor="todo">Todo Body</label>
            <textarea id="todo" {...register("todo",{required: "Todo body is required."})} />
            {
            errors.todo && (
              <p className="text-red-500 italic">{errors.todo.message}</p>
            )
          }
        </div>
        <div className="flex flex-col">
            <label className="text-lg font-bold text-gray-700" htmlFor="userId">User ID</label>
            <input type="number" id="userId" {...register("userId",{required: "userId is required."})} />
            {
            errors.userId && (
              <p className="text-red-500 italic">{errors.userId.message}</p>
            )
          }
        </div>
        <div className="flex items-center justify-between">
          {props.isEdit ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Todo
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Todo
            </button>
          )}
        </div>
    </form>
  )
}

export default TodoForm