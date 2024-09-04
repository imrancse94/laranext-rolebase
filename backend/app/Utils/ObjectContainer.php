<?php

namespace App\Utils;



class ObjectContainer
{
    public static function set($key, $value):void
    {
        app()->instance($key, $value);
    }

    public static function get($key)
    {
        try {
            return app($key);
        } catch (\Exception $ex) {

        }

        return null;
    }
}
