import React from 'react';

const Settings = () => {
    return (
        <section className='px-5 pt-20 lg:px-20 lg:pb-20 lg:pt-40 lg:flex w-full'>
            {/* right part */}
            <div className='w-full lg:w-1/2 order-2 p-5'>
                {/* user div */}
                <div className='py-10'>
                    <div className=' '>
                        <figure className='flex justify-start mb-3'>
                            <div className='h-32 w-32 bg-secondary bg-opacity-25 rounded-full' ></div>
                        </figure>
                        <h3 className='text-3xl text-left font-semibold'>User Name</h3>
                    </div>
                </div>

                {/* general options section */}
                <div className='rounded-xl p-3 lg:p-10 bg-secondary bg-opacity-25'>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left mb-3'>General</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-3'>

                        {/* Name */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center ">Name:</label>
                            <input className='input input-text border-none col-span-5' type="text" placeholder='Name' />
                        </form>

                        {/* email subscription  */}
                        <div className='flex space-x-4'>
                            <input type={"checkbox"} className="checkbox-primary" /><p> Recieve Monthly Report</p>
                        </div>
                        {/* currency */}
                        <div>

                        </div>

                    </div>


                </div>
            </div>

            {/* left part  */}
            <div className=' w-full lg:w-1/2 grid grid-cols-1 gap-5 p-5'>
                {/* address section */}
                <div className='rounded-xl p-3 lg:p-10 bg-secondary bg-opacity-25'>

                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left mb-3'>Address</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-3'>

                        {/* address */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center ">Address:</label>
                            <input className='input input-text border-none col-span-5' type="text" placeholder='City, Country' />
                        </form>
                        {/* postal code */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center ">Zip Code:</label>
                            <input className='input input-text border-none col-span-5' type="number" placeholder='postal code' />
                        </form>


                    </div>

                </div>

                {/* contact div */}
                <div className='rounded-xl p-3 lg:p-10 bg-secondary bg-opacity-25'>
                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left mb-3'>Contact informations</h3>
                        <hr></hr>
                    </div>

                    {/* options container */}

                    <div className='mt-5 grid grid-cols-1 gap-3'>

                        {/* Email */}
                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center ">Email:</label>
                            <input className='input input-text border-none col-span-5' type="email" placeholder='Email' />
                        </form>
                        {/* phone number */}

                        <form className='grid grid-cols-1 lg:grid-cols-6 gap-3'>
                            <label className="flex items-center ">Phone :</label>
                            <input className='input input-text border-none col-span-5' type={"tel"} placeholder='Phone Number' />
                        </form>

                    </div>
                </div>

                {/* security div */}
                <div className='rounded-xl p-3 lg:p-10 bg-secondary bg-opacity-25'>
                    {/* title div */}
                    <div className='w-1/2 '>
                        <h3 className='text-2xl text-left mb-3'>Security</h3>
                        <hr />
                    </div>

                    {/* options container */}

                    <form className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5'>
                        {/* Current Password */}
                        <input className='input input-password ' type="password" placeholder='Current Password' />

                        <input className='input input-password ' type="password" placeholder='New Password' />
                        <button type="submit" className='btn max-w-min btn-primary'>change</button>
                    </form>
                </div>

                {/* delete div */}
                <div className='w-1/2 p-3 lg:p-10 bg-red-200 rounded-xl'>
                    <button type="submit" className='btn btn-outline btn-error ml-0 mb-3'>Delete Account</button>
                    <hr></hr>
                </div>
            </div>
        </section>
    );
};

export default Settings;