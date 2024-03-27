import { CustomerCard } from "@/components/chat/friend-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

const Chat = () => {
  const customers = [
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "backlog",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "backlog",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "todo",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "in progress",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "in progress",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "canceled",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "canceled",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "backlog",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "canceled",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "todo",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "backlog",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "backlog",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "todo",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "in progress",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "in progress",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "canceled",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "canceled",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "backlog",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "canceled",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "todo",
    },
  ];

  return (
    <div className="h-screen">
      <Card className="flex p-4 sticky top-[70px]   h-[85%] ">
        <div className=" w-1/4 border-r-2 pr-4 hidden xl:block">
          <CustomerCard
            name={"Isayas Melkamu"}
            message={"customer.status"}
            time={"customer.amount"}
          />
          <Input placeholder={"Search contacts"} className="max-w-sm" />
          <div className=" space-y-2   h-[85%]  overflow-y-scroll">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                name={customer.email}
                message={customer.status}
                time={customer.amount}
              />
            ))}
          </div>
        </div>

        <div className="w-3/4">
          <div className="border-b-2 flex gap-2 pl-4 py-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="overflow-y-scroll h-[85%] p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, harum eum impedit laboriosam corporis iure totam illo,
            cum incidunt, reprehenderit debitis magnam quis qui ea dolorem iste
            error perspiciatis provident delectus. Fuga nam beatae excepturi,
            obcaecati minima libero possimus ratione error eligendi nihil eaque
            praesentium ab optio doloribus voluptates dolorem vel! Ipsum
            repudiandae ipsa delectus, aliquam et voluptatibus aut earum
            reiciendis explicabo facere ea, magni exercitationem in architecto
            tenetur cumque veritatis rem. Sit voluptates error dignissimos
            officia quaerat. Modi quibusdam atque fugiat iste sint consequuntur
            laboriosam error dolor aliquam nisi sapiente sequi, aliquid nihil?
            Aliquid, nisi iusto minima sunt quae consequatur repudiandae quaerat
            reiciendis aperiam saepe, perspiciatis pariatur ipsa exercitationem
            aspernatur expedita dolorem quas ex voluptatum molestias suscipit
            dolores! Ad quaerat necessitatibus hic consequatur doloribus
            voluptatem doloremque magni. Suscipit incidunt maiores dignissimos
            nostrum rerum perferendis nulla quia aspernatur, id amet
            perspiciatis, fuga deleniti necessitatibus blanditiis, animi quam
            architecto consectetur. Atque modi provident sed non repellat,
            dolorum, quisquam officiis culpa quod nesciunt eius quia obcaecati
            dolores animi praesentium adipisci amet, quo nobis? Dignissimos
            obcaecati, tenetur ratione possimus necessitatibus eveniet est?
            Eligendi ut perspiciatis, aliquam, doloribus qui vero laborum
            aspernatur eveniet voluptates tempore temporibus quis distinctio
            quaerat necessitatibus sapiente consectetur nesciunt minima alias
            beatae, vel adipisci molestias deleniti. Ut commodi perferendis
            consequatur dolorum neque, error quod officiis aliquid voluptatum
            nesciunt quam molestias vero sint et itaque, sed accusantium,
            obcaecati at corporis rerum facere saepe quia. A necessitatibus est
            quasi neque quidem adipisci quis id nesciunt odio. Delectus ab
            cumque perferendis consectetur vero, libero magnam iusto iure fuga
            voluptatem beatae repellat earum accusamus? Aut laudantium
            consectetur explicabo deleniti facere omnis aperiam, neque vero
            assumenda asperiores repudiandae nobis, veniam dicta perferendis.
            Recusandae, molestiae at porro dolores consequatur quas? Hic,
            tempore. Consequuntur voluptatibus labore, deleniti iure facere,
            laborum, officia eos maxime quod dolor blanditiis quas fugiat sint
            enim assumenda perspiciatis! Non at veritatis dolor, corporis totam
            rerum odit tempore, officiis voluptates modi ipsam suscipit harum et
            nesciunt eius quas amet dolore exercitationem nostrum veniam tenetur
            sunt perspiciatis. Consequatur officiis vitae accusantium optio,
            sint voluptate iste, ipsum voluptates hic cum enim porro quisquam
            cupiditate alias maiores unde libero? Numquam ipsa nostrum veritatis
            sint, odio, excepturi eius quo, quibusdam quos neque alias! Quidem
            necessitatibus corporis vel at laboriosam ratione suscipit. Corporis
            voluptate soluta rem dignissimos labore ea consectetur laboriosam
            reiciendis, cupiditate et quia, quisquam magni totam? Qui quos eius
            placeat architecto deserunt eveniet cumque mollitia a quam obcaecati
            dolor iusto omnis molestias, sunt eligendi numquam accusamus modi
            dicta perspiciatis, nam, quo sint ducimus. Doloribus, nostrum
            voluptas. Et reprehenderit sapiente nulla adipisci porro debitis
            accusamus exercitationem consequuntur velit in voluptates, cumque
            laboriosam vel ea natus, fugiat perspiciatis non iusto repellat
            eaque nam modi quos! Rem accusamus laborum omnis illo, rerum
            officiis eveniet, corporis amet delectus illum excepturi laboriosam
            non. Neque, rem totam! Fuga consectetur quae minus, non, nesciunt
            fugit labore assumenda culpa doloribus facere dolorem, magni aut
            molestiae deleniti temporibus modi excepturi autem. Veniam ducimus
            iure est commodi? Dolorum soluta ducimus enim quis temporibus
            veritatis, quaerat nam, placeat nisi ad quod perspiciatis animi
            illum rerum eveniet minima distinctio qui. Similique molestias
            debitis aut ratione eaque, rerum illum voluptatibus magni quibusdam,
            maxime id itaque at? Temporibus quidem adipisci exercitationem
            perferendis pariatur nisi quae voluptatum voluptatem veniam debitis
            incidunt minus placeat iusto explicabo rem praesentium quaerat nobis
            eligendi, ex fugiat. Voluptas vero, esse ratione eaque magni quos
            dolore debitis. Optio explicabo eaque, reprehenderit voluptatem
            tenetur minus facilis commodi culpa unde id sapiente ipsam quos
            omnis vitae sunt ipsa ratione voluptates dicta recusandae! Atque,
            ducimus tempore nisi dicta fuga laboriosam ipsum dolorem modi sequi
            ut repudiandae deleniti voluptate quam molestiae alias cupiditate
            amet nesciunt architecto quis magnam asperiores dolorum enim
            dignissimos similique. Delectus nihil placeat, dolorem modi nam ex
            unde? Blanditiis illo velit nam ratione quaerat rerum! Iure itaque
            nostrum cum expedita doloribus ipsum quaerat molestiae nisi
            consequuntur magnam facere maiores ratione obcaecati repellat, alias
            consequatur reiciendis deserunt consectetur a asperiores laborum
            voluptate veritatis necessitatibus dolorem! Odit commodi
            reprehenderit ipsam sint veritatis a similique non earum itaque
            autem, ipsum aspernatur ab corporis voluptatum obcaecati numquam
            quae vitae temporibus! Eum officia quia tenetur perspiciatis animi
            asperiores dolorem tempore repudiandae architecto quibusdam eos
            deserunt, maxime laudantium numquam nulla expedita rerum sint,
            quaerat perferendis odio cupiditate quisquam beatae impedit? Autem,
            cupiditate iusto. Sunt quia atque dolor aliquam beatae quisquam,
            voluptate culpa nihil dolore commodi est odit sed sint facere
            repellat fugiat dolores dignissimos fuga laboriosam ratione
            distinctio! Aut ducimus deleniti eos. Consequatur iure in inventore
            commodi alias quibusdam veniam porro explicabo corrupti, harum
            accusamus? Ad, fuga quod. Aperiam iusto possimus, sunt reprehenderit
            iste vitae voluptatem id doloribus corrupti laborum quos molestias
            dolorum magnam odit totam. Delectus consequuntur officiis rerum
            praesentium non dicta quasi quaerat consectetur illo. Quas cumque
            repellat quos ex incidunt iste molestias dolor ratione amet illo
            dolore alias aperiam, labore eaque consequuntur, illum, maiores eius
            magnam explicabo quod hic voluptates provident! Quod ea quos dolore
            vero. Illum nulla, vitae necessitatibus ratione cumque magnam
            numquam consectetur doloribus libero, ducimus porro laudantium
            deleniti quod accusantium, autem rem saepe ipsa ex voluptatibus.
            Possimus quod tempora deleniti. Saepe deserunt minima soluta vitae
            corporis quidem quos aperiam possimus in eveniet totam quis, qui
            necessitatibus, beatae amet explicabo, ratione architecto optio
            autem temporibus ipsum earum doloremque cumque nisi. Nisi, est
            libero facere dolore quis eligendi consectetur, possimus enim cumque
            tempore sint eos voluptate rem. Obcaecati minima numquam deleniti
            quam, beatae ipsa fugiat sunt, et velit expedita tenetur aliquam
            maiores, maxime quos. Neque repellat vero quasi nobis ex tempore
            iste perspiciatis tempora quam quae nostrum, autem tenetur dolore
            perferendis dolorum dolor aspernatur corrupti ullam optio aperiam
            quis. Dolorem voluptate alias neque aspernatur omnis, saepe dolor
            maiores molestiae quibusdam ullam accusantium optio corporis modi
            accusamus amet libero id! Et, quis sunt delectus obcaecati optio
            minus suscipit fugit atque a iste expedita eius. Tenetur laudantium
            optio explicabo, numquam recusandae esse fugiat eligendi ducimus?
            Explicabo, sapiente aspernatur. Nam in ad dolorum iusto eveniet
            eligendi molestiae delectus hic doloribus deleniti earum, cumque
            modi commodi! Eius eveniet porro, quos vel quis ipsam sit tenetur?
          </div>
          <div className="border-b-2 flex gap-2 pl-4 py-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
