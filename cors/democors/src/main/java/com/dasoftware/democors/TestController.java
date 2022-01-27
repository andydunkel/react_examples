package com.dasoftware.democors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="dataitem")
public class TestController {

    @GetMapping
    //@CrossOrigin
    public List<DataItem> getDataItems() {
        List<DataItem> list = new ArrayList<DataItem>();

        var item1 = new DataItem();
        item1.setId("1");
        item1.setName("Kiwi");

        var item2 = new DataItem();
        item2.setId("2");
        item2.setName("Andy");

        var item3 = new DataItem();
        item3.setId("3");
        item3.setName("Ebe");

        var item4 = new DataItem();
        item4.setId("4");
        item4.setName("Fuzzy");

        list.add(item1);
        list.add(item2);
        list.add(item3);
        list.add(item4);

        return list;
    }


}
