import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    include: {
      monday: true,
      friday: true,
    },
  });
  console.log(doctors);

  return (
    <div>
      <p>Doctors List</p>
      <p>
        {
            doctors.map((user: any) => (
                <div key={user.id} className="p-10">
                  <p>{user.name}</p>
                  <p className="mt-5">Slots Below</p>
                  {
                    user.monday.map((item: any) => (
                        <div key={item.id}>
                          <p>{item.slot}</p>
                        </div>
                    ))
                  }
                </div>
            ))
        }
      </p>
    </div>
  );
}
