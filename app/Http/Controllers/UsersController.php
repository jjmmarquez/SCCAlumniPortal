<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Http\Requests\UserRequest;

use App\User;

use Auth;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $users = User::paginate(10);

        return view('users.index',compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(UserRequest $request)
    {

        $user = new User($request->all());

        $new_password = uniqid();
        $new_username = $user['username'];

        $user['password'] = bcrypt($new_password);

        $user->save();

        return view('users.confirmation',compact('new_username','new_password'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return redirect('users');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        User::destroy($id);

        return redirect('users');
    }


    public function search($column,$id,$order){

        $order_array = explode('.',$order);
    
        $users = $id !== '*' ? 
            User::where($column, 'LIKE', '%'.$id.'%')->orderBy($order_array[0],$order_array[1])->paginate(10) : 
            User::orderBy($order_array[0],$order_array[1])->paginate(10) ;

        $users->setPath(url('users'.'/'));
    
        return view('users.includes.tbl_user_management_body',compact('users'));
            
    }

}
