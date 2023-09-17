import { Package } from "@/types/package";

const packageData: Package[] = [
  {
    name: "Air Conditioner",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Repair Now",
  },
  {
    name: "Fridge",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Repair Now",
  },
  {
    name: "HVAC",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Soon",
  },
  {
    name: "DoorFrame",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Good",
  },
];

const TableThree = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto ">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Item
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Last Service Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white ">
                Next date to service 
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((Item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {Item.name}
                  </h5>
              
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {Item.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      Item.status === "Good"
                        ? "text-success bg-success"
                        : Item.status === "Repair Now"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                    }`}
                  >
                    {Item.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5 ml-[5%]">
                    <div className=''>
                      May 20, 2023
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
