import fetch from 'node-fetch';

export default async function handler(req, res) {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.MONGODB_DATA_API_KEY,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE,
    database: 'database',
    collection: 'users',
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    switch (req.method) {
      case 'GET':
        // Handle different GET queries based on req.query parameters
        if (req?.query?.userId) {
        const userId = req?.query?.userId;
        // console.log("adminId", adminId);
          // Perform a query to find a specific document by id
          const readData = await fetch(`${baseUrl}/find`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              filter: { 
              "members": {$elemMatch: {id: userId}}
            },
            }),
          });
          const readDataJson = await readData.json();
          // console.log("readDataJson", readDataJson);
          res.status(200).json(readDataJson.documents);
        } else {
          // Perform a query to find multiple documents
          const readData = await fetch(`${baseUrl}/find`, {
            ...fetchOptions,
            body: JSON.stringify({
              ...fetchBody,
              sort: { postedAt: -1 },
            }),
          });
          const readDataJson = await readData.json();
          res.status(200).json(readDataJson.documents);
        }
        break;
      case 'POST':
        // Handle the POST request to insert a new document
        const data = req.body;
        const insertData = await fetch(`${baseUrl}/insertOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            document: data,
          }),
        });
        const insertDataJson = await insertData.json();
        res.status(201).json(insertDataJson);
        break;
      // case 'PUT':
      //   // Handle the PUT request to update a document by id
      //   const updateData = await fetch(`${baseUrl}/updateOne`, {
      //     ...fetchOptions,
      //     body: JSON.stringify({
      //       ...fetchBody,
      //       filter: { _id: { $oid: req.body._id } },
      //       update: {
      //         $set: {
      //           body: req.body.body,
      //         },
      //       },
      //     }),
      //   });
      //   const updateDataJson = await updateData.json();
      //   res.status(200).json(updateDataJson);
      //   break;
      case "PUT":
      const userId = req.query.userId;
      console.log(userId)
      const updateData = await fetch(`${baseUrl}/updateOne`, {
        ...fetchOptions,
        body: JSON.stringify({
          ...fetchBody,
          filter: { _id: {$oid: userId}},
          update: {
            $set: {
              handWrittenNotes: req.body.handWrittenNotes,
              otherNotes: req.body.otherNotes,
              websiteLinks: req.body.websiteLinks,
              youtubeLinks: req.body.youtubeLinks,
              streaks: req.body.streaks,
            }
          },
        }),
      });
      const updateDataJson = await updateData.json();
      res.status(200).json(updateDataJson);
      break;

      case 'DELETE':
            // Handle the DELETE request to delete a room by room ID
            const roomId = req.query.roomId;
            console.log("delete roomId here", roomId);

            const deleteData = await fetch(`${baseUrl}/deleteOne`, {
              ...fetchOptions,
              body: JSON.stringify({
                ...fetchBody,
                filter: { _id: roomId },
              }),
            });
            const deleteDataJson = await deleteData.json();
            res.status(204).json(deleteDataJson);
            break;
        default:
          res.status(405).end();
          break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
