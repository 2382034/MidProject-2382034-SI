import { useMutation, useQuery } from '@tanstack/react-query'
import axios from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'

interface Todo {
    id : number,
    todo : string,
    completed : boolean,
    userId : number
}

interface TodoList{
    todos : Todo[] 
}

interface DeletedTodo extends Todo {
    isDeleted: Boolean;
    deletedOn: string;
}

const fetchTodoList = async () => {
    return axios.get<TodoList>('/todo')
}

const deleteTodo = async (id: string | undefined) => {
    return await axios.delete<DeletedTodo>(`todo/${id}`);
};

const TodoSkeleton = () => {
    return (
        <div className='flex flex-col space-y-4 mt-2'>
            <div className='flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                    <div className="bg-gray-300 animate-pulse h-5 w-5 rounded-sm"></div>
                    <div className="bg-gray-300 animate-pulse h-5 w-96 rounded-xl"></div>
                </div>
                <div className="bg-gray-300 animate-pulse h-5 w-5 rounded-full mr-1"></div>
            </div>
            <div>
                <div className="bg-gray-300 animate-pulse h-0.5 w-full rounded-xl"></div>

                <div className='flex justify-end'>
                    <div className="bg-gray-300 animate-pulse h-3 w-4 "></div>
                </div>
            </div>
        </div>
    );
}

const Todo = () => {
    const getTodoList = useQuery({
        queryKey : ["Todo"],
        queryFn : fetchTodoList
    });

    const deleteTodoMutation = useMutation(
        {mutationFn : (id : string) => deleteTodo(id)}
    )

    const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <button className="fixed bottom-4 right-4 bg-[#001F3F] text-white rounded-full p-4 shadow-lg hover:bg-[#001B36] focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:ring-offset-2 z-10" onClick={() => navigate("./add")}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div className="bg-[#001F3F] max-w-[700px] mx-auto mt-3 text-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Todo List</h2>
        <hr />
          <div className="flex flex-col gap-9 px-4 mt-9 max-w-4xl mx-auto w-full h-[600px] pt-10 overflow-x-scroll bg-[#001F3F]">
            {   getTodoList.isFetching? 
                Array.from({length : 6}).map(() => <TodoSkeleton/>) 
                : getTodoList.data?.data.todos.map((Todo) => {
                return (
                    <div className='flex flex-col space-y-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex space-x-2 items-center'>
                                <input type="checkbox" disabled checked={Todo.completed} />
                                <p className={
                                    !Todo.completed ? 'text-lg font-semibold':
                                    'text-lg font-semibold line-through text-gray-300' 
                                }>{Todo.todo}</p>
                            </div>
                        </div>
                        <div>
                            <hr />
                            <div className='flex justify-end'>
                                <p className='text-xs text-gray-300'>{Todo.userId}</p>
                            </div>
                        </div>
                    </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
