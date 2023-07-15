import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import notifyApi from "../../Service/Api/notifyApi";
import { useTranslation } from "react-i18next";
const General = () => {
  const { t } = useTranslation();
  const [listThongBao, setListThongBao] = useState(null);
  // const listThongBao = [
  //   {
  //     id: 1,
  //     title: "Thông báo 1",
  //     startDate: "2022-03-20",
  //     endDate: "2022-03-25",
  //   },
  //   {
  //     id: 2,
  //     title: "Thông báo 2",
  //     startDate: "2022-04-01",
  //     endDate: "2022-04-10",
  //   },
  //   {
  //     id: 3,
  //     title: "Thông báo 3",
  //     startDate: "2022-05-05",
  //     endDate: "2022-05-15",
  //   },
  // ];
  useEffect(() => {
    const getNotify = async () => {
      const responseNotify = await notifyApi.getAll();
      // console.log("responseNotify", responseNotify);
      const dataTable = await responseNotify.data.map((res) => {
        return {
          id: res.MaTB,
          title: res.TenTB,
          startDate: moment(res.NgayBatDau).format("DD/MM/YYYY"),
          endDate: moment(res.NgayKetThuc).format("DD/MM/YYYY"),
          MaBanDaoTao: res.MaBanDaoTao,
        };
      });
      dataTable.map((res) => {
        // console.log(
        //   // res,
        //   // res.startDate,
        //   // res.endDate,
        //   // moment().format("DD/MM/YYYY"),
        //   moment(res.startDate, "DD/MM/YYYY"),
        //   moment(res.endDate, "DD/MM/YYYY"),
        //   moment(res.startDate, "DD/MM/YYYY").isAfter(moment(), "day"),
        //   moment().isBetween(
        //     moment(res.startDate, "DD/MM/YYYY"),
        //     moment(res.endDate, "DD/MM/YYYY"),
        //     "day",
        //     "[]",
        //   ),
        //   moment(res.endDate, "DD/MM/YYYY").isSame(moment()),
        //   moment(res.endDate, "DD/MM/YYYY").isBefore(moment(), "day")
        //   // moment(new Date()).format("DD/MM/YYYY")
        //   // &&
        //   // moment(new Date(res.startDate)).format("DD/MM/YYYY") <
        //   //   moment(new Date()).format("DD/MM/YYYY")
        // );
      });
      setListThongBao(dataTable);
    };
    getNotify();
  }, []);
  return (
    <Box
    // sx={{
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    // }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t("Notify")}
      </Typography>
      <Timeline
        position="alternate"
        // sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {listThongBao &&
          listThongBao.map((item) => (
            <TimelineItem key={item.id}>
              <TimelineOppositeContent
                color={
                  // moment(res.startDate, "DD/MM/YYYY").isAfter(moment(), "day"),
                  moment().isBetween(
                    moment(item.startDate, "DD/MM/YYYY"),
                    moment(item.endDate, "DD/MM/YYYY"),
                    "day",
                    "[]"
                  )
                    ? // moment(item.endDate, "DD/MM/YYYY").isBefore(moment(), "day")
                      "text.success" // current date is between startTime and endTime
                    : moment(item.endDate, "DD/MM/YYYY").isBefore(
                        moment(),
                        "day"
                      )
                    ? "text.secondary" // current date is before startTime
                    : moment(item.startDate, "DD/MM/YYYY").isAfter(
                        moment(),
                        "day"
                      )
                    ? "text.secondary"
                    : ""
                }
              >
                {item.startDate} - {item.endDate}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    // moment(res.startDate, "DD/MM/YYYY").isAfter(moment(), "day"),
                    moment().isBetween(
                      moment(item.startDate, "DD/MM/YYYY"),
                      moment(item.endDate, "DD/MM/YYYY"),
                      "day",
                      "[]"
                    )
                      ? // moment(item.endDate, "DD/MM/YYYY").isBefore(moment(), "day")
                        "success" // current date is between startTime and endTime
                      : moment(item.endDate, "DD/MM/YYYY").isBefore(
                          moment(),
                          "day"
                        )
                      ? "error" // current date is before startTime
                      : moment(item.startDate, "DD/MM/YYYY").isAfter(
                          moment(),
                          "day"
                        )
                      ? "grey"
                      : ""
                  }
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                color={
                  // moment(res.startDate, "DD/MM/YYYY").isAfter(moment(), "day"),
                  moment().isBetween(
                    moment(item.startDate, "DD/MM/YYYY"),
                    moment(item.endDate, "DD/MM/YYYY"),
                    "day",
                    "[]"
                  )
                    ? // moment(item.endDate, "DD/MM/YYYY").isBefore(moment(), "day")
                      "text.success" // current date is between startTime and endTime
                    : moment(item.endDate, "DD/MM/YYYY").isBefore(
                        moment(),
                        "day"
                      )
                    ? "text.secondary" // current date is before startTime
                    : moment(item.startDate, "DD/MM/YYYY").isAfter(
                        moment(),
                        "day"
                      )
                    ? "text.secondary"
                    : ""
                }
                sx={{
                  fontWeight: moment().isBetween(
                    moment(item.startDate, "DD/MM/YYYY"),
                    moment(item.endDate, "DD/MM/YYYY"),
                    "day",
                    "[]"
                  )
                    ? // moment(item.endDate, "DD/MM/YYYY").isBefore(moment(), "day")
                      "bold" // current date is between startTime and endTime
                    : "",
                }}
              >
                {item.title}
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </Box>
  );
};
export default General;
